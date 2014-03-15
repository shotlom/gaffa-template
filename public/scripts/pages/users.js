module.exports = function(app){
    var views = app.views,
        actions = app.actions,
        behaviours = app.behaviours;

    function createUserForm(){
        var userNameBox = new views.textbox();
        userNameBox.value.binding = '[userName]';

        var pushNewUser = new actions.push();
        pushNewUser.source.binding = 'data'; //data is in scope from ajax action success
        pushNewUser.target.binding = '[/users]';

        var clearNewUser = new actions.remove();
        clearNewUser.target.binding = '[]';

        var saveUser = new actions.ajax();
        saveUser.method.value = 'POST';
        saveUser.url.binding = '(router.get "usersData")';
        saveUser.source.binding = '[]';
        saveUser.actions.success = [pushNewUser, clearNewUser];

        var submitButton = new views.button();
        submitButton.text.value = 'Submit';
        submitButton.actions.click = [saveUser];

        var form = new views.form();
        form.path = '[/newUser]';
        form.views.content.add([
            userNameBox,
            submitButton
        ]);
        form.actions.submit = [saveUser];

        return form;
    }

    function createUsersList(){
        var nameLabel = new views.label();
        nameLabel.text.binding = '[userName]'

        var userTemplate = new views.container();
        userTemplate.views.content.add([
            nameLabel
        ])

        var userList = new views.list();
        userList.list.binding = '[]';
        userList.list.template = userTemplate;

        return userList;
    }

    function createPageBehaviours(){
        var onLoad = new behaviours.pageLoad();

        var fetchUsers = new actions.ajax();

        fetchUsers.url.binding = '(router.get "usersData")';
        fetchUsers.target.binding = '[]';

        onLoad.actions.load = [fetchUsers];
        
        return [onLoad];
    }

    function createSomePage(){
        var somePage = new views.container();

        somePage.classes.value = 'home';
        somePage.views.content.add([
            createUsersList(),
            createUserForm()
        ]);
        somePage.path = '[/users]';
        somePage.behaviours = createPageBehaviours();
        
        return somePage;
    }

    return createSomePage();

};
module.exports = function(app){
    var views = app.views,
        actions = app.actions,
        behaviours = app.behaviours;

    function createMenuItem(labelSettings, href){
        var menuItem = new views[href ? 'anchor' : 'button']({
                text: labelSettings
            }),
            closeMenu = new actions.set();

        closeMenu.source.value = false;
        closeMenu.target.binding = '[showMainMenu]';

        menuItem.actions.click = [closeMenu];
        menuItem.classes.value = 'menuItem';

        if(href){
            menuItem.href.binding = href.binding;
            menuItem.href.value = href.value;
        }

        return menuItem;
    }

    function createNavItem(labelSettings, page){
        var navItem = createMenuItem(labelSettings, {
                binding: '(router.get "' + page + '")'
            });

        navItem.classes.binding = '(join " " "menuItem" (? (router.isIn [currentPage] "' + page + '") "current" ""))';

        return navItem;
    }

    function createMenu(){
        var menu = new views.showable();

        menu.show.binding = '[showMainMenu]';
        menu.views.content.add([
            createNavItem({value:'Users'}, 'users'),
            createNavItem({value:'Things'}, 'things')
        ]);

        return menu;
    }

    return createMenu();

};
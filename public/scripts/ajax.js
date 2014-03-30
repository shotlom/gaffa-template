var url = require('url');

module.exports = function(gaffa){
    var oldAjax = gaffa.ajax;
    gaffa.ajax = function(settings){
        var oldError = settings.error,
            targetUrl = window.location.toString();

        if (! settings.headers ){ 
            settings.headers = {};
        }

        var storageKey = window.localStorage.getItem('apikey');

        if ( storageKey && storageKey !== 'undefined' ){
            settings.headers.Authentication =  storageKey;
        } 


        settings.error = function(error){
            
            if(error.target.status === 401){
                //var responseData = JSON.parse(error.target.response);
                gaffa.ajax({
                    url:'/getapikey',
                    type:'get',
                    dataType:'json',
                    success:function(data){
                        //console.log(data);
                        window.localStorage.setItem('apikey',data.apikey);
                        gaffa.ajax(settings);
                    }
                });
            }

            
            if(error.target.status === 422){
                var responseData = JSON.parse(error.target.response);

                // ToDo: alert the user of errors.
            }
            oldError && oldError.apply(this, arguments);
        };

        return oldAjax(settings);
    };
};
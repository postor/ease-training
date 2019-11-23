var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('My Admin').baseApiUrl('../'); 
    var allEntitys = {};
    
    (()=>{
      allEntitys['dataset'] = nga.entity('dataset');
      allEntitys['epoch'] = nga.entity('epoch');
      allEntitys['model'] = nga.entity('model');
      allEntitys['train'] = nga.entity('train');
      
    })()
    
    var addTableFns = []
        
    addTableFns.push(()=>{    
        //---- code for table dataset ----

        var idField = nga.field('id')
        .label('编号');

        var otherFields = [            
            nga.field('voczip_path').label('zip路径'),            
            nga.field('name').label('名称'),
        ];
        var allFields = idField?[
            idField,
            ...otherFields
        ]:otherFields;

        var table = allEntitys['dataset'];
        //primaryKey!
        table.identifier(idField).label('dataset');

        table.listView()
        .fields(allFields)
        .listActions(idField?['show','edit','delete']:[])
        .filters(allFields.map(x=>x.pinned(true)))
        .sortField('id')
        .perPage(10);

        table.creationView().fields(otherFields);
        table.editionView().fields(allFields);
        table.showView().fields(allFields);
        
        admin.addEntity(table);
        allEntitys['dataset'] = table
    
        //---- end for table dataset ----
    })
        
    addTableFns.push(()=>{    
        //---- code for table epoch ----

        var idField = nga.field('id')
        .label('编号');

        var otherFields = [            
            nga.field('job_id').label('job_id'),            
            nga.field('epoch_num').label('epoch编号'),            
            nga.field('loss').label('loss'),            
            nga.field('m_ap').label('meanAP'),            
            nga.field('created_at').label('创建时间戳'),
        ];
        var allFields = idField?[
            idField,
            ...otherFields
        ]:otherFields;

        var table = allEntitys['epoch'];
        //primaryKey!
        table.identifier(idField).label('epoch');

        table.listView()
        .fields(allFields)
        .listActions(idField?['show','edit','delete']:[])
        .filters(allFields.map(x=>x.pinned(true)))
        .sortField('id')
        .perPage(10);

        table.creationView().fields(otherFields);
        table.editionView().fields(allFields);
        table.showView().fields(allFields);
        
        admin.addEntity(table);
        allEntitys['epoch'] = table
    
        //---- end for table epoch ----
    })
        
    addTableFns.push(()=>{    
        //---- code for table model ----

        var idField = nga.field('id')
        .label('编号');

        var otherFields = [            
            nga.field('name').label('名称'),            
            nga.field('docker_cmd').label('docker命令'),
        ];
        var allFields = idField?[
            idField,
            ...otherFields
        ]:otherFields;

        var table = allEntitys['model'];
        //primaryKey!
        table.identifier(idField).label('model');

        table.listView()
        .fields(allFields)
        .listActions(idField?['show','edit','delete']:[])
        .filters(allFields.map(x=>x.pinned(true)))
        .sortField('id')
        .perPage(10);

        table.creationView().fields(otherFields);
        table.editionView().fields(allFields);
        table.showView().fields(allFields);
        
        admin.addEntity(table);
        allEntitys['model'] = table
    
        //---- end for table model ----
    })
        
    addTableFns.push(()=>{    
        //---- code for table train ----

        var idField = nga.field('id')
        .label('编号');

        var otherFields = [            
            nga.field('dataset_id').label('dataset_id'),            
            nga.field('model_id').label('model_id'),            
            nga.field('working').label('工作状态，0=未开始，1=进行中，2=已完成，-1=出错'),            
            nga.field('created_at').label('创建时间戳'),            
            nga.field('started_at').label('启动时间'),            
            nga.field('ended_at').label('完成时间'),
        ];
        var allFields = idField?[
            idField,
            ...otherFields
        ]:otherFields;

        var table = allEntitys['train'];
        //primaryKey!
        table.identifier(idField).label('train');

        table.listView()
        .fields(allFields)
        .listActions(idField?['show','edit','delete']:[])
        .filters(allFields.map(x=>x.pinned(true)))
        .sortField('id')
        .perPage(10);

        table.creationView().fields(otherFields);
        table.editionView().fields(allFields);
        table.showView().fields(allFields);
        
        admin.addEntity(table);
        allEntitys['train'] = table
    
        //---- end for table train ----
    })
    

    // attach the admin application to the DOM and execute it
    addTableFns.map((x)=>x())    
    nga.configure(admin);
}]);

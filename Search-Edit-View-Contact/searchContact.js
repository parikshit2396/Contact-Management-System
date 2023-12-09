import { LightningElement ,track} from 'lwc';
import fetchContact from '@salesforce/apex/searchContact.fecthContact';
import {NavigationMixin} from 'lightning/navigation';

const columns = [
    {label:'Id' , fieldName :'Id'},
    {label:'Name',fieldName:'LastName'},
    {label:'Email Address',fieldName:'Email'},
    {label:'Phone',fiedlName:'Phone'},
    {label:'CreatedBy',fieldName:'CreatedById'},
    {label:'View Action',type:'button',typeAttributes:{
        label:'View',
        name:'view',
        title:'View',
        value:'view',
        iconPosition:'center'
    }},
    {label:'Edit Action',type:'button',typeAttributes:{
        label:'Edit',
        name:'edit',
        title:'Edit',
        value:'edit',
        iconPosition:'center'
    }
    },

];

export default class SearchContact extends NavigationMixin(LightningElement ){
    contacts;
    errors;
    columns = columns;
    handlechange(event){
        const searchKey = event.target.value;
        window.console.log('the value of ' +searchKey);
        if(searchKey){
        fetchContact({searchKey})
            .then(result=>{
                this.contacts = result;
                window.console.log('the value of result' + result);
            })
            .catch(error=>{
                this.errors = error;
            });
        }
        else{
            this.contacts = undefined;
        }
        }

        handlerowaction(event){
            const actionName = event.detail.action.name;
            const row = event.detail.row;
            switch(actionName){
                case 'view':
                        this[NavigationMixin.Navigate]({
                            type : 'standard__recordPage',
                            attributes: {
                                recordId : row.Id,
                                actionName : 'view'
                            }
                        });
                break;
                case 'edit':
                    this[NavigationMixin.Navigate]({
                        type:'standard__recordPage',
                        attributes:{
                            recordId : row.Id,
                            objectApiName: 'Contact',
                            actionName : 'edit'
                        }
                    });
                break;
                default:
            }
        }
    }

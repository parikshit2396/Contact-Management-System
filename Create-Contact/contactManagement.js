import { LightningElement, api, track } from 'lwc';
import savedata from '@salesforce/apex/contactOperation.createContactRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class ContactManagement extends LightningElement {

    @track conButton = 'Create Contact';
    @track createTemplate = false;
    @track contactRecord = {
        LastName: NAME_FIELD,
        Email: EMAIL_FIELD,
        Phone: PHONE_FIELD
    };
        
    handleonChangeName(event) {
        this.contactRecord.LastName = event.target.value;
        window.console.log('Name is :' + this.contactRecord.LastName)
    }
    handleonChangeEmail(event) {
        this.contactRecord.Email = event.target.value;
        window.console.log('Name is :' + this.contactRecord.Email)
    }
    handleonChangePhone(event) {
        this.contactRecord.Phone = event.target.value;
        window.console.log('Name is :' + this.contactRecord.Phone)
    }
    handelonclick(event) {
        const label = event.target.label;
        if (label == 'Create Contact') {
            this.conButton = 'Hide Form';
            this.createTemplate = true;
        }
        else if (label == 'Hide Form') {
            this.conButton = 'Create Contact';
            this.createTemplate = false;
        }

    }

    handleSave() {
        savedata({
            conName: this.contactRecord.LastName,
            conEmail: this.contactRecord.Email,
            conPhone: this.contactRecord.Phone
        })
            .then(result => {
                this.contactRecord = {};
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact successfully Created',
                    variant: 'success'
                });
                this.dispatchEvent(event);

            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'failure !!',
                    message: 'Plase check, Something get wrong',
                    variant: 'error'
                });
                this.dispatchEvent(event);

            });
    }

}
import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import PROPERTY_TYPE_FIELD from '@salesforce/schema/Property__c.Property_Type__c';

const DELAY = 350;
const MAX_PRICE = 1200000;

export default class PropertyFilter extends LightningElement {
    @track searchKey = '';

    @track maxPrice = MAX_PRICE;

    @track minBedrooms = 0;

    @track minBathrooms = 0;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: PROPERTY_TYPE_FIELD
    })
    picklistValues;

    @wire(CurrentPageReference) pageRef;

    handleReset() {
        this.searchKey = '';
        this.maxPrice = MAX_PRICE;
        this.minBedrooms = 0;
        this.minBathrooms = 0;
        this.propertyType = 0;
        this.fireChangeEvent();
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.detail.value;
        this.fireChangeEvent();
    }

    handleMaxPriceChange(event) {
        this.maxPrice = event.detail.value;
        this.fireChangeEvent();
    }

    handleMinBedroomsChange(event) {
        this.minBedrooms = event.detail.value;
        this.fireChangeEvent();
    }

    handleMinBathroomsChange(event) {
        this.minBathrooms = event.detail.value;
        this.fireChangeEvent();
    }

    handlePropertyTypeChange(event) {
        this.propertyType = event.detail.value;
        this.fireChangeEvent();
    }

    fireChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            const filters = {
                searchKey: this.searchKey,
                maxPrice: this.maxPrice,
                minBedrooms: this.minBedrooms,
                minBathrooms: this.minBathrooms,
                propertyType: this.propertyType
            };
            fireEvent(this.pageRef, 'dreamhouse__filterChange', filters);
        }, DELAY);
    }
}

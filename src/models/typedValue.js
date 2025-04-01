CtrlDocs.TypedValue = class TypedValue {
    #native;

    constructor(native) {
        this.#native = !native ? TypedValue.CreateNative() : native;
    }

    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                is_null_value: true,
                type: MFDatatype.MFDatatypeUninitialized,
                data: {}
            }
        } else return new MFiles.TypedValue();
    }
    
    get DataType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.type;
        }
        else return this.#native.DataType;
    }
    set DataType(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.type = value;
        }
        else this.#native.DataType = value;
    }
    
    get Value() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.TypedValueHelper.GetValue(this.#native);
        }
        else {
            if (this.DataType === MFDatatype.MFDatatypeLookup) {
                return this.GetValueAsLookup();
            } else if (this.DataType === MFDatatype.MFDatatypeMultiSelectLookup) {
                return this.GetValueAsLookups();
            }
            return this.#native.Value;
        }
    }
    
    set Value(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.data = CtrlDocs.TypedValueHelper.GetTypedValue(value, this.DataType);
            this.#native.is_null = false;
            this.#native.is_null_value = false;
        }
        else this.#native.Value = value;
    }

    get DisplayValue() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.TypedValueHelper.GetValueAsUnlocalizedText(this.#native);
        }
        else return this.#native.DisplayValue;
    }

    /**
     * @return {CtrlDocs.Lookup}
     */
    get Lookup() {
        return this.GetValueAsLookup();
    }

    /**
     * @return {CtrlDocs.Lookups}
     */
    get Lookups() {
        return this.GetValueAsLookups();
    }
    
    get HasValue() {
        return !this.IsNULL();
    }
    
    // Methods

    /**
     * @return {boolean}
     */
    IsNULL() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.is_null_value ?? this.#native.is_null;
        }
        else return this.#native.IsNULL();
    }

    IsUninitialized() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.type === MFDatatype.MFDatatypeUninitialized;
        }
        else return this.#native.IsUninitialized();
    }

    SetValueToNULL(dataType) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.is_null = true;
            this.#native.is_null_value = true;
            this.DataType = dataType;
        }
        else this.#native.SetValueToNULL(dataType);
    }

    SetValue(dataType, value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.DataType = dataType;
            this.Value = value;
        }
        else {
            if (
                dataType === MFDatatype.MFDatatypeLookup ||
                dataType === MFDatatype.MFDatatypeMultiSelectLookup) 
            {
                this.#native.SetValue(dataType, value.GetNative());
            }
            else this.#native.SetValue(dataType, value);
        }
    }

    /**
     * @param lookup {CtrlDocs.Lookup}
     */
    SetValueToLookup(lookup) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.SetValue(MFDatatype.MFDatatypeLookup, lookup);
        }
        else this.#native.SetValueToLookup(lookup.GetNative());
    }

    /**
     * @param lookups {CtrlDocs.Lookups}
     */
    SetValueToMultiSelectLookup(lookups) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.SetValue(MFDatatype.MFDatatypeMultiSelectLookup, lookups);
        }
        else this.#native.SetValueToMultiSelectLookup(lookups.GetNative());
    }

    /**
     * @return {CtrlDocs.Lookup}
     */
    GetValueAsLookup() {
        if (this.IsNULL()) return new CtrlDocs.Lookup();
        
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.Lookup(this.#native.data.lookup);
        }
        else return new CtrlDocs.Lookup(this.#native.GetValueAsLookup());
    }

    /**
     * @return {CtrlDocs.Lookups}
     */
    GetValueAsLookups() {
        if (this.IsNULL()) return new CtrlDocs.Lookups();
        
        if (CtrlDocs.Platform.IsNextGen()) {
            if (this.DataType === MFDatatype.MFDatatypeLookup) {
                return new CtrlDocs.Lookups({
                        values: [this.#native.data.lookup]
                    }
                );
            }
            return new CtrlDocs.Lookups(this.#native.data.multi_select_lookup);
        }
        else return new CtrlDocs.Lookups(this.#native.GetValueAsLookups());
    }

    /**
     * @param that {CtrlDocs.TypedValue}
     * @returns {number}
     */
    CompareTo(that) {
        if (this.IsNULL() && that.IsNULL()) {
            return 0; // Both are null, considered equal
        }
        if (this.IsNULL()) {
            return -1; // thisValue is null, considered less than thatValue
        }
        if (that.IsNULL()) {
            return 1; // thatValue is null, considered less than thisValue
        }
        if (this.DataType !== that.DataType) return -1;
        
        if (CtrlDocs.Platform.IsNextGen()) {
            return CtrlDocs.TypedValueHelper.CompareTo(this, that);
        }
        
        // The client handles comparison of lookups in a weird way, ensure to check them correctly
        if (this.DataType === MFDatatype.MFDatatypeLookup) return this.Lookup.CompareTo(that.Lookup);
        else if (this.DataType === MFDatatype.MFDatatypeMultiSelectLookup) return this.Lookups.CompareTo(that.Lookups);
        
        return this.#native.CompareTo(that.GetNative());
    }
    
    toJSON() {
        if (this.IsNULL()){
            return {
                DataType: this.DataType,
                HasValue: false
            }
        }
        
        switch(this.DataType) {
            case MFDatatype.MFDatatypeLookup:
                return {
                    DataType: this.DataType,
                    Lookup: this.Value.toJSON(),
                    HasValue: !this.IsNULL()
                }
            case MFDatatype.MFDatatypeMultiSelectLookup:
                return {
                    DataType: this.DataType,
                    Lookups: this.Value.toJSON(),
                    HasValue: !this.IsNULL()
                }
            case MFDatatype.MFDatatypeDate:
            case MFDatatype.MFDatatypeTime:
            case MFDatatype.MFDatatypeTimestamp:
                return {
                    DataType: this.DataType,
                    Value: this.Value.toISOString(),
                    HasValue: !this.IsNULL()
                }
            default:
                return {
                    DataType: this.DataType,
                    Value: this.Value,
                    HasValue: !this.IsNULL()
                }
        }
    }
    
    GetNative() {
        return this.#native;
    }
}
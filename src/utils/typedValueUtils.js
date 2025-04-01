CtrlDocs.TypedValueHelper = class TypedValueHelper {

    /**
     * Gets the unlocalized text value of a M-Files native TypedValue
     * @param typedValue {TypedValue}
     * @return {string}
     */
    static GetValueAsUnlocalizedText(typedValue) {
        if (typedValue.is_null_value) return '';
        
        switch(typedValue.type) {
            case MFDatatype.MFDatatypeText:
                return typedValue.data.text;
            case MFDatatype.MFDatatypeMultiLineText:
                return typedValue.data.multi_line_text;
            case MFDatatype.MFDatatypeInteger:
                return `${typedValue.data.integer}`;
            case MFDatatype.MFDatatypeInteger64:
                return `${typedValue.data.integer64}`;
            case MFDatatype.MFDatatypeFloating:
                return `${typedValue.data.real_number}`;
            case MFDatatype.MFDatatypeLookup:
                return `${typedValue.data.lookup.value_list_item_info.name}`;
            case MFDatatype.MFDatatypeMultiSelectLookup:
                return typedValue.data.multi_select_lookup.values
                    .map(lookup => lookup.value_list_item_info.name)
                    .join('; ');
            case MFDatatype.MFDatatypeBoolean:
                return `${typedValue.data.boolean}`;
            default:
                return 'NOT IMPLEMENTED'
                
        }
    }
    
    static GetTypedValue(value, dataType) {
        switch(dataType) {
            case MFDatatype.MFDatatypeText:
                return { text: value };
            case MFDatatype.MFDatatypeMultiLineText:
                return { multi_line_text: value };
            case MFDatatype.MFDatatypeInteger:
                return { integer: value };
            case MFDatatype.MFDatatypeInteger64:
                return { integer64: value };
            case MFDatatype.MFDatatypeFloating:
                return { real_number: value };
            case MFDatatype.MFDatatypeLookup:
                return { lookup: value.GetNative() }
            case MFDatatype.MFDatatypeMultiSelectLookup:
                return { multi_select_lookup: value.GetNative() };
            case MFDatatype.MFDatatypeDate:
                return { date: CtrlDocs.DateTimeHelpers.JsDateToProtobufDate(value) }
            case MFDatatype.MFDatatypeTime:
                return { time: CtrlDocs.DateTimeHelpers.JsDateToProtobufDate(value) }
            case MFDatatype.MFDatatypeTimestamp:
                return { timestamp: CtrlDocs.DateTimeHelpers.JsDateToProtobufDate(value) }
            case MFDatatype.MFDatatypeBoolean:
                return { boolean: value };
            default:
                return 'NOT IMPLEMENTED'

        }
    }

    /**
     * 
     * @param typedValue
     * @returns {CtrlDocs.Lookups|RegExp|string|*|string|CtrlDocs.Lookup|Date}
     * @constructor
     */
    static GetValue(typedValue) {
        if (typedValue.is_null || typedValue.is_null_value) return null;
        
        switch(typedValue.type) {
            case MFDatatype.MFDatatypeText:
                return typedValue.data.text;
            case MFDatatype.MFDatatypeMultiLineText:
                return typedValue.data.multi_line_text;
            case MFDatatype.MFDatatypeInteger:
                return typedValue.data.integer;
            case MFDatatype.MFDatatypeInteger64:
                return typedValue.data.integer64;
            case MFDatatype.MFDatatypeFloating:
                return typedValue.data.real_number;
            case MFDatatype.MFDatatypeLookup:
                return new CtrlDocs.Lookup(typedValue.data.lookup);
            case MFDatatype.MFDatatypeMultiSelectLookup:
                return new CtrlDocs.Lookups(typedValue.data.multi_select_lookup);
            case MFDatatype.MFDatatypeDate:
                return CtrlDocs.DateTimeHelpers.protobufDateToJsDate(typedValue.data.date);
            case MFDatatype.MFDatatypeTime:
                return CtrlDocs.DateTimeHelpers.protobufDateToJsDate(typedValue.data.time);
            case MFDatatype.MFDatatypeTimestamp:
                return CtrlDocs.DateTimeHelpers.protobufDateToJsDate(typedValue.data.timestamp);
            case MFDatatype.MFDatatypeBoolean:
                return typedValue.data.boolean;
            default:
                return 'NOT IMPLEMENTED'
        }
    }

    /**
     * 
     * @param thisTypedValue {CtrlDocs.TypedValue}
     * @param thatTypedValue {CtrlDocs.TypedValue}
     * @return {number|number}
     * @constructor
     */
    static CompareTo(thisTypedValue, thatTypedValue) {
        if (thisTypedValue.IsNULL() && thatTypedValue.IsNULL()) {
            return 0; // Both are null, considered equal
        }
        if (thisTypedValue.IsNULL()) {
            return -1; // thisValue is null, considered less than thatValue
        }
        if (thatTypedValue.IsNULL()) {
            return 1; // thatValue is null, considered less than thisValue
        }
            
        const thisValue = CtrlDocs.TypedValueHelper.GetValue(thisTypedValue.GetNative());
        const thatValue = CtrlDocs.TypedValueHelper.GetValue(thatTypedValue.GetNative());

        switch(thisTypedValue.DataType) {
            case MFDatatype.MFDatatypeText:
            case MFDatatype.MFDatatypeMultiLineText:
                if (thisValue < thatValue) return -1;
                if (thisValue > thatValue) return 1;
                return 0;
            case MFDatatype.MFDatatypeInteger:
            case MFDatatype.MFDatatypeInteger64:
            case MFDatatype.MFDatatypeFloating:
                return thisValue - thatValue;
            case MFDatatype.MFDatatypeLookup:
            case MFDatatype.MFDatatypeMultiSelectLookup:
                return thisValue.CompareTo(thatValue);
            case MFDatatype.MFDatatypeDate:
            case MFDatatype.MFDatatypeTime:
            case MFDatatype.MFDatatypeTimestamp:
                return thisValue.getTime() - thatValue.getTime();
            case MFDatatype.MFDatatypeBoolean:
                return (thisValue === thatValue) ? 0 : (thisValue ? 1 : -1);
            default:
                return 0;
        }
    }
}
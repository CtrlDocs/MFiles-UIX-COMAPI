CtrlDocs.SearchCondition = class SearchCondition {
    #native;
    
    constructor(native) {
        this.#native = !native ? SearchCondition.CreateNative() : native;
    }
    
    static CreateNative() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return {
                "expression": {},
                "type": 0,
                "value": {}
            }
        } else return new MFiles.SearchCondition();
    }
    
    // Expression
    get Expression() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.Expression(this.#native.expression);
        }
        else return new CtrlDocs.Expression(this.#native.Expression);
    }
    set Expression(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.expression = value.GetNative();
        } 
        else this.#native.Expression = value.GetNative();
    }

    // Condition Type
    get ConditionType() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return this.#native.type;
        }
        else return this.#native.ConditionType;
    }
    set ConditionType(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.type = value;
        }
        else this.#native.ConditionType = value;
    }

    // Typed Value
    get TypedValue() {
        if (CtrlDocs.Platform.IsNextGen()) {
            return new CtrlDocs.TypedValue(this.#native.value);
        }
        else return new CtrlDocs.TypedValue(this.#native.TypedValue);
    }
    set TypedValue(value) {
        if (CtrlDocs.Platform.IsNextGen()) {
            this.#native.value = value.GetNative();
        }
        else this.#native.TypedValue = value.GetNative();
    }
    
    toJSON() {
        return {
            Expression: this.Expression.toJSON(),
            ConditionType: this.ConditionType,
            TypedValue: this.TypedValue.toJSON()
        }
    }
    
    // Methods

    /**
     * Sets the search condition with the provided expression, condition type, and typed value.
     * @param {CtrlDocs.Expression} expression
     * @param {number} conditionType
     * @param {CtrlDocs.TypedValue} typedValue
     */
    Set(expression, conditionType, typedValue) {
        this.Expression = expression;
        this.ConditionType = conditionType;
        this.TypedValue = typedValue;
    }
    
    GetNative() {
        return this.#native;
    }
}
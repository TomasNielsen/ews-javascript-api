﻿import {ExchangeVersion} from "../Enumerations/ExchangeVersion";
import {EwsServiceXmlReader} from "../Core/EwsServiceXmlReader";
import {EwsServiceXmlWriter} from "../Core/EwsServiceXmlWriter";
import {XmlElementNames} from "../Core/XmlElementNames";
import {PropertyDefinitionFlags} from "../Enumerations/PropertyDefinitionFlags";
import {DefaultExtendedPropertySet} from "../Enumerations/DefaultExtendedPropertySet";
import {MapiPropertyType} from "../Enumerations/MapiPropertyType";
import {XmlNamespace} from "../Enumerations/XmlNamespace";
import {XmlAttributeNames} from "../Core/XmlAttributeNames";

import {StringHelper, Convert} from "../ExtensionMethods";

import {PropertyDefinitionBase} from "./PropertyDefinitionBase";

//should be done
export class ExtendedPropertyDefinition extends PropertyDefinitionBase {
    private static FieldFormat: string = "{0}: {1} ";
    private static PropertySetFieldName: string = "PropertySet";
    private static PropertySetIdFieldName: string = "PropertySetId";
    private static TagFieldName: string = "Tag";
    private static NameFieldName: string = "Name";
    private static IdFieldName: string = "Id";
    private static MapiTypeFieldName: string = "MapiType";
    get Id(): number { return this.id; }
    get MapiType(): MapiPropertyType { return this.mapiType; }
    get Name(): string { return this.name; }
    get PropertySet(): DefaultExtendedPropertySet { return this.propertySet; }
    get PropertySetId(): any { return this.propertySetId; } //System.Guid
    get Tag(): number { return this.tag; }
    get Version(): ExchangeVersion { return ExchangeVersion.Exchange2007_SP1; }
    Type: any;// System.Type;
    private propertySet: DefaultExtendedPropertySet;
    private propertySetId: any;// System.Guid;
    private tag: number;
    private name: string;
    private id: number;
    private mapiType: MapiPropertyType;

    constructor(tag?: number,
        name?: string,
        mapiType?: MapiPropertyType,
        propertySet?: DefaultExtendedPropertySet) {
        super();
        this.tag = tag || 0;
        this.mapiType = mapiType || MapiPropertyType.String;
        this.propertySet = propertySet;
        this.name = name;
    }

    //AddJsonProperties(jsonPropertyDefinition: JsonObject, service: ExchangeService): any { throw new Error("ExtendedPropertyDefinition.ts - AddJsonProperties : Not implemented."); }
    Equals(obj: any): boolean {
        var propertyDefinition = <ExtendedPropertyDefinition>obj;
        return ExtendedPropertyDefinition.IsEqualTo(propertyDefinition, this);
    }
    FormatField(name: string, fieldValue: string): string {
        debugger;
        return (fieldValue != null)
            ? StringHelper.Format(ExtendedPropertyDefinition.FieldFormat, name, fieldValue)
            : "";
    }
    GetHashCode(): number { throw new Error("ExtendedPropertyDefinition.ts - GetHashCode : Not implemented."); }
    //GetJsonType(): string { throw new Error("ExtendedPropertyDefinition.ts - GetJsonType : Not implemented."); }
    GetPrintableName(): string {
        debugger;
        var sb = "";
        sb += "{";
        sb += this.FormatField(ExtendedPropertyDefinition.NameFieldName, this.Name);
        sb += this.FormatField(ExtendedPropertyDefinition.MapiTypeFieldName, MapiPropertyType[this.MapiType]);
        sb += this.FormatField(ExtendedPropertyDefinition.IdFieldName, this.Id.toString());
        sb += this.FormatField(ExtendedPropertyDefinition.PropertySetFieldName, DefaultExtendedPropertySet[this.PropertySet]);
        //sb += FormatField < Guid?> (PropertySetIdFieldName, this.PropertySetId);
        sb += this.FormatField(ExtendedPropertyDefinition.PropertySetIdFieldName, this.PropertySetId.ToString ? this.PropertySetId.ToString() : this.PropertySetId);
        sb += this.FormatField(ExtendedPropertyDefinition.TagFieldName, this.Tag.toString());
        sb += "}";
        return sb;
    }
    GetXmlElementName(): string { return XmlElementNames.ExtendedFieldURI; }
    static IsEqualTo(extPropDef1: ExtendedPropertyDefinition, extPropDef2: ExtendedPropertyDefinition): boolean {
        return
        extPropDef1, extPropDef2 ||
        (extPropDef1 && extPropDef2 &&
            extPropDef1.Id == extPropDef2.Id &&
            extPropDef1.MapiType == extPropDef2.MapiType &&
            extPropDef1.Tag == extPropDef2.Tag &&
            extPropDef1.Name == extPropDef2.Name &&
            extPropDef1.PropertySet == extPropDef2.PropertySet &&
            extPropDef1.propertySetId == extPropDef2.propertySetId);
    }
    //LoadFromJson(jsonObject: JsonObject): any { throw new Error("ExtendedPropertyDefinition.ts - LoadFromJson : Not implemented."); }
    LoadPropertyValueFromXmlJsObject(jsObject: any): void {

        for (var key in jsObject) {
            switch (key) {
                case XmlAttributeNames.DistinguishedPropertySetId:
                debugger;
                    this.propertySet = isNaN(jsObject[key]) ? DefaultExtendedPropertySet[jsObject[key]] : <any><DefaultExtendedPropertySet> +(jsObject[key]);// jsObject.ReadEnumValue<DefaultExtendedPropertySet>(key);
                    break;
                case XmlAttributeNames.PropertySetId:
                    debugger;
                    this.propertySetId = jsObject[key];// new Guid(jsObject.ReadAsString(key));
                    break;
                case XmlAttributeNames.PropertyTag:
                    this.tag = Convert.toNumber(jsObject[key]);//Convert.ToUInt16(jsObject.ReadAsString(key), 16);
                    break;
                case XmlAttributeNames.PropertyName:
                    this.name = jsObject[key];//jsObject.ReadAsString(key);
                    break;
                case XmlAttributeNames.PropertyId:
                    this.id = Convert.toInt(jsObject[key]);//jsObject.ReadAsInt(key);
                    break;
                case XmlAttributeNames.PropertyType:
                    this.mapiType = isNaN(jsObject[key]) ? MapiPropertyType[jsObject[key]] : <any><MapiPropertyType> +(jsObject[key]);// jsObject.ReadEnumValue<MapiPropertyType>(key);
                    break;
                default:
                    break;
            }
        }
    }
    private LoadFromXml(reader: EwsServiceXmlReader): void {
        var attributeValue: string;

        attributeValue = reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.DistinguishedPropertySetId);
        if (!StringHelper.IsNullOrEmpty(attributeValue)) {
            this.propertySet = DefaultExtendedPropertySet[attributeValue];
        }

        attributeValue = reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.PropertySetId);
        if (!StringHelper.IsNullOrEmpty(attributeValue)) {
            this.propertySetId = attributeValue;// new Guid(attributeValue);
        }

        attributeValue = reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.PropertyTag);
        if (!StringHelper.IsNullOrEmpty(attributeValue)) {
            this.tag = +(attributeValue);// Convert.ToUInt16(attributeValue, 16);
        }

        this.name = reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.PropertyName);

        attributeValue = reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.PropertyId);
        if (!StringHelper.IsNullOrEmpty(attributeValue)) {
            this.id = +(attributeValue);// int.Parse(attributeValue);
        }

        this.mapiType = MapiPropertyType[reader.ReadAttributeValue(XmlNamespace.NotSpecified, XmlAttributeNames.PropertyType)];
    }
    WriteAttributesToXml(writer: EwsServiceXmlWriter): void {
        if (this.propertySet) {
            writer.WriteAttributeValue("", XmlAttributeNames.DistinguishedPropertySetId, this.propertySet);
        }
        if (this.propertySetId) {
            writer.WriteAttributeValue("", XmlAttributeNames.PropertySetId, this.propertySetId.ToString());
        }
        if (this.tag) {
            writer.WriteAttributeValue("", XmlAttributeNames.PropertyTag, this.tag);
        }
        if (!StringHelper.IsNullOrEmpty(this.name)) {
            writer.WriteAttributeValue("", XmlAttributeNames.PropertyName, this.name);
        }
        if (this.id) {
            writer.WriteAttributeValue("", XmlAttributeNames.PropertyId, this.id);
        }

        writer.WriteAttributeValue("", XmlAttributeNames.PropertyType, this.mapiType);
    }
}


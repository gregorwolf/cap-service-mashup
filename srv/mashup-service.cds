using {API_BUSINESS_PARTNER as bp} from './external/API_BUSINESS_PARTNER';

service MashupService {
    entity BusinessPartner as projection on bp.A_BusinessPartner;
    function Hello(name : String) returns String;
}

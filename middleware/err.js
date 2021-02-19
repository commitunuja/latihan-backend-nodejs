exports.validate = (error) => {
    switch (error) {
        case "ER_DUP_ENTRY": {
            return 'Data sudah ada';
        }
        case "ER_NO_SUCH_TABLE": {
            return 'Table tidak di temukan';
        }
        case "ER_BAD_FIELD_ERROR": {
            return 'Kolom tidak di temukan'
        }
        case "ER_BAD_DB_ERROR": {
            return 'Database tidak di temukan'
        }
        case "ER_PARSE_ERROR" :{
            return 'Paramter salah'
        }
        default: {
            return error
        }
    }
};

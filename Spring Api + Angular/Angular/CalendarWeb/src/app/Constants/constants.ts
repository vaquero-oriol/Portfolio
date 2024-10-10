export class AppConstants {
    public static readonly API_URL = 'http://localhost:8080/';


    //USERS
    public static readonly createUser = AppConstants.API_URL + "users/createUser";
    public static readonly logIn = AppConstants.API_URL+"users/login";
    public static readonly userName = AppConstants.API_URL+"users/name";
    

    //NOTES
    public static readonly createNote=AppConstants.API_URL+"notes/createnote";
    public static readonly getNotebyId= AppConstants.API_URL+"notes/getnote";
    public static readonly updateNote=AppConstants.API_URL+"notes/updatenote";
    public static readonly getAllNotes=AppConstants.API_URL+"notes/getallnotes"
    
  }
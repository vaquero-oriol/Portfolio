export class AppConstants {
    public static readonly API_URL = 'http://localhost:8080/';


    //USERS
    public static readonly createUser = AppConstants.API_URL + "users/createUser";
    public static readonly logIn = AppConstants.API_URL+"users/login";

    //NOTES
    public static readonly createNote=AppConstants.API_URL+"notes/createnote";
    public static readonly getNotebyId= AppConstants.API_URL+"notes/getnote";
    
  }
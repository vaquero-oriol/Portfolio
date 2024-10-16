package Calendar.Entity.Request;

import lombok.Data;

import java.util.List;

@Data
public class NotesRequest {

    private int id;

    private String name;
    private String Content;

    private List<String> Photos;

    private List<String> Audios;




}

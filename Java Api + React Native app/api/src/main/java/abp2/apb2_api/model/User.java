package abp2.apb2_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String name;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    @JsonIgnore
    private byte[] image;

    @OneToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @Column
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "User_statue",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "statue_id"))
    private Set<Statue> statues = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "Friendship",
            joinColumns = @JoinColumn(name = "user1_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user2_id", referencedColumnName = "id"))
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private Set<User> friends;

    @ManyToMany(mappedBy = "friends", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<User> friendOf;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<FriendRequest> sentFriendRequests;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<FriendRequest> receivedFriendRequests;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email);
    }

    public void addStatue(Statue statue) throws Exception {
        statues.add(statue);
    }

    public void addFriend(User friend) throws Exception {
        if (friends.contains(friend) || friend.getFriends().contains(this)) {

        } else {
            try {
                friends.add(friend);
                friend.getFriends().add(this);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }


    }

    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }

    public void removeFriend(User friend) {
        friends.remove(friend);
        friend.getFriends().remove(this);
    }

    public void removeStatue(Statue statue) {
        statues.remove(statue);
        statue.getUsers().remove(this);
    }

    public void updateProfile(Profile profile) {
        this.name = profile.getName();
        this.image = profile.getImage();
    }

}

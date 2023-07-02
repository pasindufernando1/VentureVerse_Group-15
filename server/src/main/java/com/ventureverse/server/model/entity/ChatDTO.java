package com.ventureverse.server.model.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chat")
public class ChatDTO {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sender", referencedColumnName = "id")
    private UserDTO sender;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver", referencedColumnName = "id")
    private UserDTO receiver;

    private String message;
    private Timestamp timestamp;

}
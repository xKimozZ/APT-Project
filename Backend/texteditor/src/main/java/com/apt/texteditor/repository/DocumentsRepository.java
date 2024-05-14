package com.apt.texteditor.repository;

import com.apt.texteditor.model.Document;
import com.apt.texteditor.model.GroupPermission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentsRepository extends MongoRepository<Document, String> {
    @Query("{$or:[{'owner': ?0}, {'groupPermissions.username': ?0, 'groupPermissions.canView': true}]}")
    List<Document> findByOwnerOrGroupPermissionsUsername(@Param("username") String username);

}

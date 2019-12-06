# Development Notes

## [Get Strapi + Gatsby working again](https://trello.com/c/97HBfkrD)

- After setting up Mongo + Docker, Strapi admin panel was inaccessible (not sure if before/after `yarn upgrade --latest` putting me at 3.0) even though the API was returning the correct results.
  - Started a new Strapi project in a separate directory `hgcms/`; regained admin panel.
  - Copied over `api/`, `config/extensions/users-permissions/models/` from `hughguiney-cms/` to restore schema data.
- After upgrading npm dependencies with yarn, Gatsby started failing while querying Strapi fields, e.g.:
  ```
  There was an error in your GraphQL query:

  Cannot query field "localFile" on type "StrapiUserProfilePhoto".

  GraphQL request:8:9
  7 |       profilePhoto {
  8 |         localFile {
    |         ^
  9 |           childImageSharp {

  File: src/components/author.js:51:9
  ```
  - Thought it might have been access control; set additional user/unauthenticated permissions to no avail.
  - Seems to have been an issue with multiple images (which was not an issue pre-upgrade). Replaced `gatsby-source-strapi` with third-party `gatsby-source-strapi-multiple-images` to fix. ⚠️ TEMPORARY WORKAROUND ⚠️
    - Apparently this is supposed to be fixed already: [gatsby-image support for media/image fields](https://github.com/strapi/gatsby-source-strapi/pull/10)
    
## [Try Docker for MongoDB installation](https://trello.com/c/DCTRrDgL)

- Couldn’t install MongoDB on Arch Linux as a package because Arch delisted it from Pacman after Mongo’s licensing change.
  - AUR: `mongodb` Won’t install
  - AUR: `mongodb-bin` Installs; won’t start
  - Possibile solutions:
    - [Docker](https://hub.docker.com/_/mongo)
    - [debtap](https://github.com/helixarch/debtap)
    - [Compiling from source](https://www.mongodb.com/download-center/community)
- Using Docker Compose for instantiation; links a MongoDB image for the database and a Strapi image for the API.
- Simply reading the existing project into Docker did not work. Only successful after:
  - Basing the `api` image on `strapi/strapi`.
  - Setting up a shared volume `strapi_mongodb_data` (which becomes `${pwd}_strapi_mongodb_data` after spinning up). Not sure 
  - Logging in manually to the Mongo 
  - This is not portable; trying to put everything needed into `docker-compose.yml`
  - Hope is to copy the API spec files after running the base image, as a kind of “patch”.
  - `hgcms/api/Dockerfile` processes `RUN` commands *before* executing the build process for the base image. So `RUN cp -r /home/api/* /srv/app/api/` errors out:
    ```
    $ docker-compose up --build
    Pulling db (mongo:)...
    latest: Pulling from library/mongo
    7ddbc47eeb70: Already exists
    […]
    Digest: sha256:1a9478d8188d6be31dd2e8de076d402edf20446e54933aad7ff49f5b457d486c
    Status: Downloaded newer image for mongo:latest
    Building api
    Step 1/3 : FROM strapi/strapi:latest
    latest: Pulling from strapi/strapi
    9a0b0ce99936: Already exists
    […]
    Digest: sha256:0decd89344641490aef56132fd2028f2f37cef6a18d073e114f4aaea8307f7b4
    Status: Downloaded newer image for strapi/strapi:latest
    ---> b7a71a1bc3f5
    Step 2/3 : RUN cp -r /home/api/* /srv/app/api/
    ---> Running in 918a5a0f2a9a
    cp: cannot stat '/home/api/*': No such file or directory
    ERROR: Service 'api' failed to build: The command '/bin/sh -c cp -r /home/api/* /srv/app/api/' returned a non-zero code: 1
    ```

## [Compile MongoDB]()

`yaourt -S mongodb` failing with:

```
Base<T>::shallowClone() const [with T = mongo::TypeMatchExpression]':
src/mongo/db/matcher/expression_type.h:69:38:   required from here
src/mongo/db/matcher/expression_type.h:74:30: warning: redundant move in return statement [-Wredundant-move]
src/mongo/db/matcher/expression_type.h:74:30: note: remove 'std::move' call
In file included from src/mongo/db/matcher/expression_parser.h:37,
                 from src/mongo/db/query/parsed_projection.h:33,
                 from src/mongo/db/query/canonical_query.h:39,
                 from src/mongo/db/query/explain.h:34,
                 from src/mongo/db/commands.h:46,
                 from src/mongo/db/s/sharding_logging_test.cpp:37:
src/mongo/db/matcher/expression_type.h: In instantiation of 'std::unique_ptr<mongo::MatchExpression> mongo::TypeMatchExpressionBase<T>::shallowClone() const [with T = mongo::InternalSchemaBinDataEncryptedTypeExpression]':
src/mongo/db/matcher/expression_type.h:69:38:   required from here
src/mongo/db/matcher/expression_type.h:74:30: warning: redundant move in return statement [-Wredundant-move]
   74 |         return std::move(expr);
      |                              ^
src/mongo/db/matcher/expression_type.h:74:30: note: remove 'std::move' call
src/mongo/db/matcher/expression_type.h: In instantiation of 'std::unique_ptr<mongo::MatchExpression> mongo::TypeMatchExpressionBase<T>::shallowClone() const [with T = mongo::InternalSchemaTypeExpression]':
src/mongo/db/matcher/expression_type.h:69:38:   required from here
src/mongo/db/matcher/expression_type.h:74:30: warning: redundant move in return statement [-Wredundant-move]
src/mongo/db/matcher/expression_type.h:74:30: note: remove 'std::move' call
src/mongo/db/matcher/expression_type.h: In instantiation of 'std::unique_ptr<mongo::MatchExpression> mongo::TypeMatchExpressionBase<T>::shallowClone() const [with T = mongo::TypeMatchExpression]':
src/mongo/db/matcher/expression_type.h:69:38:   required from here
src/mongo/db/matcher/expression_type.h:74:30: warning: redundant move in return statement [-Wredundant-move]
src/mongo/db/matcher/expression_type.h:74:30: note: remove 'std::move' call
scons: building terminated because of errors.
build/opt/mongo/db/query/query_planner_test.o failed: Error 1
==> ERROR: A failure occurred in check().
    Aborting...
==> ERROR: Makepkg was unable to build mongodb.
==> Restart building mongodb ? [y/N]
==> --------------------------------
```

### Resources

- [mongodump and mongorestore with Docker](https://jeromejaglale.com/doc/programming/mongodb_docker_mongodump_mongorestore)
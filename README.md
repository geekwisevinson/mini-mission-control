# Mini Mission Control

This is a proof of concept for Mission Control

### Setup Instructions

#### Homebrew
Begin by downloading `Homebrew` at with the following code.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
```

 We will use Homebrew to get `postgres`, as well as `yarn`.

#### Database
We are using PosgreSQL for this application. Postgres is incredibly fast and reliable. It’s also simple to set up. So, let’s begin by running the following:

```
brew install postgres
```

If you get an error saying that postgresql is already installed, then you’re fine.

#### Yarn
What is yarn? Yarn is a package manager, similar to NPM, except it won’t crap out on failed network requests. Yarn caches every package it downloads so it never needs it again. It also parallelizes operations to maximize resource utilization so install times are faster. If you’ve installed a package before, and you’re offline, you can install it again without any internet connection

We can get `yarn` by running the following:

```
brew install yarn
```

Once we have yarn, go ahead and `cd` into the project directory, and run `yarn`. This will install all the packages from our `package.json` file.

#### Start our database
```
brew services start postgresql
```

Then

```
psql
```

You should be greeted by something like

```
psql (9.5.3)
Type “help” for help.

my_username=#
```

Begin typing

```
CREATE DATABASE mission_control;
```

Where you’ll get an echo of `CREATE DATABASE`.

Sweet! We should be all good. Our database is now running on `localhost:5432`.

#### Postico
To visualize our database, we can head on over to [eggerapps](https://eggerapps.at/postico/) and download `Postico`. This will allow us to see some neat visualizations. Don’t download from the Mac AppStore, as this is $49. The trial will work perfectly fine for our use cases.

#### Run Migrations

#### Conclusion
We now have our database set up. From here, we can run `npm start`, and our server will be running. We will have docs soon on how to interact with our database, using Paw (sending requests, and receiving responses); as well as which endpoints we can talk to.

#### Errors
If, for whatever reason, you're getting the error

```
error: select "users".* from "users" where "users"."email" = $1 limit $2 - relation "users" does not exist
```

when you send a request to `/api/v1/users`—or some other similar-looking error—it means you probably ran a migration before you had data in the file, so Postgres thought it already ran and stored that in `knex_migrations`. This can be fixed by running `npm run knex migrate:rollback`, and then `npm run knex migrate:latest`.

If this still doesn't solve the problems, kill the database server where it's currently being used, then hop back into `psql`, and run the following:

```
DROP DATABASE mission_control;
```

DON'T FORGET THE SEMICOLON AT THE END.

From there, recreate the database with

```
CREATE DATABASE mission_control;
```

and then follow through with:

```
npm run knex migrate:latest
```

Problem should be solved and the users table should now be on our database.

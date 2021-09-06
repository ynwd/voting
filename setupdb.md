npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,admin:boolean,session:string

npx sequelize-cli model:generate --name Movie --attributes title:string,description:string,duration:integer,artists:jsonb,genres:jsonb,watchURL:string,view:integer,vote:integer

npx sequelize-cli model:generate --name Vote --attributes userID:integer,votes:jsonb

npx sequelize-cli model:generate --name View --attributes userID:integer,movies:jsonb

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
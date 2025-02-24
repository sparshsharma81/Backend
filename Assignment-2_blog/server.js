const express = require('express');
const app = express();
const fs = require('fs');

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`User with ip-address "${req.ip}", accessing "${req.url}" at ${new Date().toString()}`);
    next();
});


app.get("/",(req,res)=>{
    res.render("home");
})

const getPosts = () => {
    const data = fs.readFileSync('posts.json',"utf-8");
    return JSON.parse(data);
}

app.get("/posts",(req,res)=>{
    const posts = getPosts();
    res.render("post",{posts,single:false}); 
})

app.get("/post",(req,res)=>{
    const postID = req.query.id ? req.query.id : null;
    const posts = getPosts();
    const post = posts.find(p => String(postID) === String(p.id));
    if (!post) {
        return res.status(404).send("Post not found");  
    }
    res.render("post",{post,single:true});
})

app.get("/add-post",(req,res)=>{
    res.render("add-post");
})

app.post("/add-post",(req,res)=>{
    const {image , title , content} = req.body;

    const posts = getPosts();
    const newPost = {
        id: posts.length ? Number(posts[posts.length - 1].id) + 1 : 1,
        image,
        title,
        content
    };

    posts.push(newPost);
    fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
    res.redirect("/posts");
})

app.listen(3000,()=>{
    console.log("Server initated at port 3000");
})
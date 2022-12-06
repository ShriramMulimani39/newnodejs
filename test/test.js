const Blog = require("../models/Blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Blogs", () => {
    beforeEach((done) => {
        Blog.deleteMany({}, (err) => {
            done();
        });
    });
    describe("/GET blog", () => {
        it("it should GET all the blogs", (done) => {
            chai
                .request(app)
                .get("/api/blogs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("/POST blog", () => {
        it("it should new POST a blog", (done) => {
            let blog = {
                title: "This is the first blog", 
                body: "This is a blog post",
                image:
                    "https://www.shutterstock.com/shutterstock/photos/570560110/display_1500/stock-photo-color-butterfly-isolated-on-white-570560110.jpg",
            };
            chai
                .request(app)
                .post("/api/blogs")
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("object");
                    res.body.status.should.be.eql("success");
                    done();
                });
        });
    });
    describe("/GET/:id blog", () => {
        it("it should new GET a blog by the id ", (done) => {
            let blog = new Blog({
                title: "This is the first blog", 
                body: "This is a blog post",
                image:"https://d23.com/app/uploads/2013/04/1180w-600h_mickey-mouse_1.jpg",
            });
            blog.save((err, blog) => {
                chai
                .request(app)
                .get("/api/blogs/" + blog.id)
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("object");
                    res.body.status.should.be.eql("success");
                    done();
                });
            });
        });
    });
    describe("/PUT/:id blog", () => {
        it("it should UPDATE a blog given the id", (done) => {
            let blog = new Blog({
                title: "This is the first blog",
                body: "This is a blog post",
                image:"https://www.shutterstock.com/shutterstock/photos/570560110/display_1500/stock-photo-color-butterfly-isolated-on-white-570560110.jpg",
            });
            blog.save((err, blog) => {
                console.log(blog.id);
                chai
                    .request(app)
                    .put("/api/blogs/" + blog.id)
                    .send({
                        title: "The first blog was updated", 
                        body: "This is a blog post", 
                        image:
                            "https://www.shutterstock.com/shutterstock/photos/570560110/display_1500/stock-photo-color-butterfly-isolated-on-white-570560110.jpg",
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success");
                        done();
                    });
            });
        });
    });
    describe("/DELETE/:id blog", () => {
        it("it should DELETE a blog given the id", (done) => {
            let blog = new Blog({
                title: "This is the first blog",
                body: "This is a blog post",
                image: 
                    "https://www.shutterstock.com/shutterstock/photos/570560110/display_1500/stock-photo-color-butterfly-isolated-on-white-570560110.jpg",
            });
            blog.save((err, blog) => {
                chai
                    .request(app)
                    .delete("/api/blogs/" + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.should.be.a("object");
                        res.body.status.should.be.eql("success");
                        done();
                    });
            });
        });
    });
});
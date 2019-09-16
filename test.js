let chai = require('chai');
let chaiHttp = require('chai-http');
let chaiSorted = require('chai-sorted');
let app = require('./app');

chai.use(chaiHttp);
chai.use(chaiSorted);
let should = chai.should();
chai.use(require('chai-things'));

/*
* Test the /GET route
*/
describe('GET /players', () => {
    it('it should get all the players sorted by id', (done) => {
      chai.request(app)
          .get('/players')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.be.sortedBy("id");
                res.body.length.should.be.eql(5);
            done();
          });
    });
});

/*
  * Test the /GET/:id route
  */
 describe('GET /players/:id', () => {
    it('it should get a player by the given id', (done) => {
        let player = {
            "id": 52,
            "firstname": "Novak",
            "lastname": "Djokovic",
            "shortname": "N.DJO",
            "sex": "M",
            "country": {
              "picture": "https://i.eurosport.com/_iss_/geo/country/flag/medium/6944.png",
              "code": "SRB"
            },
            "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/565920.jpg",
            "data": {
              "rank": 2,
              "points": 2542,
              "weight": 80000,
              "height": 188,
              "age": 31,
              "last": [1, 1, 1, 1, 1]
            }
        };
        
        chai.request(app)
            .get('/players/' + player.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('id').eql(player.id);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                res.body.should.have.property('shortname');
                res.body.should.have.property('sex');
                res.body.should.have.property('country');
                res.body.should.have.property('picture');
                res.body.should.have.property('data');
                
              done();
            });
    });

    it('it should get a not founded player by the given id', (done) => {

        chai.request(app)
            .get('/players/0')
            .end((err, res) => {
                res.should.have.status(404);                
              done();
            });
    });
});

/*
  * Test the /DELETE/:id route
  */
describe('DELETE /players/:id', () => {
    it('it should delete a player given the id', (done) => {
        let player = {
        "id": 52,
        "firstname": "Novak",
        "lastname": "Djokovic",
        "shortname": "N.DJO",
        "sex": "M",
        "country": {
          "picture": "https://i.eurosport.com/_iss_/geo/country/flag/medium/6944.png",
          "code": "SRB"
        },
        "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/565920.jpg",
        "data": {
          "rank": 2,
          "points": 2542,
          "weight": 80000,
          "height": 188,
          "age": 31,
          "last": [1, 1, 1, 1, 1]
        }
        };
        chai.request(app)
            .delete('/players/' + player.id)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(4);
                    res.body.should.be.a('array');
                    res.body.should.all.have.property('id').but.not.eql(player.id);
                done();
              });
    });

    it('it should delete a not founded player by the given id', (done) => {

      chai.request(app)
          .delete('/players/0')
          .end((err, res) => {
              res.should.have.status(404);                
            done();
          });
  });
});

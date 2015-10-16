// describe('session service', function() {
//     var session;
//     var sessionObj;

//     //functions
//     var sessionService;

//     var data = {
//         expDate: 'July 6th 10:00:00 pm',
//         userid: '56738fj3dksnfk4f4jfk32ansdj32',
//         token: 'AKDIUVJ4839MDF88D9.CKDM2M2B4MF9DSM3H.2DIGMRJUD8KS8F8DND'
//     }

//     beforeEach(function() {

//         sessionService = {

//             endSession: function(sessionIsExpired) {

//                 if (sessionIsExpired) {

//                     session = null;
//                 }
//             },

//             createSession: function(data) {
//                 sessionObj = {};
//                 sessionObj.expDate = data.expDate;
//                 sessionObj.userid = data.id;
//                 sessionObj.token = data.token;

//                 return sessionObj;
//             },

//             getSession: function(data) {
//                 if (!session) {

//                     session = this.createSession(data);
//                 }

//                 return session;
//             }



//         }

//         spyOn(sessionService, 'endSession').and.callThrough();
//         spyOn(sessionService, 'createSession').and.callThrough();

//         sessionService.endSession(true);
//         sessionService.createSession(data);
//         sessionService.getSession(data);





//     });

//     //end session
//     it('should make session null if the token is expired', function() {
//         expect(sessionService.endSession).toHaveBeenCalled();

//         expect(sessionService.endSession).toHaveBeenCalledWith(true);
//         // expect(session).toBeNull();


//     });
//     //create session
//     it('should create a session with the given data', function() {
//         expect(sessionService.createSession).toHaveBeenCalled();

//         expect(sessionService.createSession).toHaveBeenCalledWith(data);

//         expect(sessionObj.expDate).toEqual(data.expDate);
//         expect(sessionObj.userid).toEqual(data.id);
//         expect(sessionObj.token).toEqual(data.token);

//     });
//     // get session
//     it('should make session null if the token is expired', function() {
//         expect(session).toEqual(sessionObj);

//     });
// })

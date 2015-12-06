function Blog($resource, root) {
    var userid = '566135093d2411aff5c123e8';
    var routeid = '5661576477f51500f845e61f';
    return $resource(root + '/user/' + userid + '/route/' + routeid + '/blogs');
}

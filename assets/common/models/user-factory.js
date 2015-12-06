function User(session, $resource, root) {

    var userid = '566135093d2411aff5c123e8';
    return $resource(root + '/user/' + userid);
}

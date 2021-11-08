function onlyAuthed(req, res, next) {
  // only allow req to proceed if there is a session
  if (req.session.user)
}

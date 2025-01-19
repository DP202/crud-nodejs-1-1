class ErrorRespone extends Error {
  // Error -> kế thừa của thèn JS
  // Error trong js nó chỉ có message thôi

  constructor(statusCode, message) {
    super(message); // super là class cha -> là Error // Truyền message vào Error
    this.statusCode = statusCode;
  }
}

module.exports = ErrorRespone;

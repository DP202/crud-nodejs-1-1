function asyncMiddleware(fn) {
  return async (req, res, next) => {
    try {
      // Lấy createAccount làm ví dụ
      // VD truyền createAccount vào fn
      // Muốn thực hiện hàm thì -> trước khi gọi hàm thì try catch
      // fn là 1 hàm async -> thì dùng await để gọi
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = asyncMiddleware;

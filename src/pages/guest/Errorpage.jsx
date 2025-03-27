export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Trang bạn đang tìm không tồn tại.</p>
        <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Quay lại trang chủ
        </a>
      </div>
    );
  }
  

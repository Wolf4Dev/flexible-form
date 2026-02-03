import { Header, Footer } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Hệ Thống Xử Lý Tài Liệu Tự Động
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Hệ Thống Xử Lý Tài Liệu
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Tự động điền thông tin vào tài liệu Word và Excel một cách nhanh chóng và chính xác.
              Hỗ trợ upload folder và file, xử lý hàng loạt tài liệu.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/document-processor">
                <Button size="lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Bắt Đầu Ngay
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Hướng Dẫn Sử Dụng
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Upload className="h-6 w-6 text-blue-500" />
                  <CardTitle>Upload Dễ Dàng</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Hỗ trợ upload file hoặc folder với drag & drop. Tự động nhận diện file Word (.docx) và Excel (.xlsx).
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-green-500" />
                  <CardTitle>Xử Lý Tự Động</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Điền form một lần, hệ thống tự động thay thế tất cả placeholder trong toàn bộ tài liệu.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Download className="h-6 w-6 text-purple-500" />
                  <CardTitle>Download Nhanh</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tải xuống từng file hoặc tất cả file dưới dạng ZIP. Xem trước kết quả trước khi download.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Cách Sử Dụng</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Upload',
                  description: 'Tải lên file hoặc folder chứa tài liệu',
                  icon: Upload,
                },
                {
                  step: '2',
                  title: 'Điền Form',
                  description: 'Nhập thông tin vào các trường bắt buộc',
                  icon: FileText,
                },
                {
                  step: '3',
                  title: 'Xử Lý',
                  description: 'Hệ thống tự động thay thế placeholder',
                  icon: CheckCircle,
                },
                {
                  step: '4',
                  title: 'Download',
                  description: 'Tải xuống tài liệu đã xử lý',
                  icon: Download,
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <item.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Bắt Đầu?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Xử lý hàng loạt tài liệu chỉ trong vài phút
            </p>
            <Link href="/document-processor">
              <Button size="lg" className="text-lg">
                <Upload className="mr-2 h-5 w-5" />
                Bắt Đầu Xử Lý Tài Liệu
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


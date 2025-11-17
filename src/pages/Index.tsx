import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-info py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Sistem Pelaporan Fasilitas Kampus
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Laporkan kondisi fasilitas kampus dengan mudah dan pantau progres penanganannya secara real-time
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="min-w-[200px]">
                <Link to="/reports">
                  <FileText className="mr-2 h-5 w-5" />
                  Buat Laporan Baru
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[200px] border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/reports">
                  Lihat Status Laporan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Fitur Utama</h2>
            <p className="text-muted-foreground">Kemudahan pelaporan untuk lingkungan kampus yang lebih baik</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Laporan Mudah</h3>
                <p className="text-muted-foreground">
                  Buat laporan dengan foto dan lokasi detail hanya dalam beberapa langkah sederhana
                </p>
              </CardContent>
            </Card>

            <Card className="border-border transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-info/10 p-3">
                  <Clock className="h-6 w-6 text-info" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Tracking Real-time</h3>
                <p className="text-muted-foreground">
                  Pantau status laporan Anda dari pending hingga selesai secara real-time
                </p>
              </CardContent>
            </Card>

            <Card className="border-border transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-success/10 p-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Penanganan Cepat</h3>
                <p className="text-muted-foreground">
                  Tim admin kampus akan segera menindaklanjuti setiap laporan yang masuk
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 inline-flex rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">150+</div>
              <div className="text-muted-foreground">Laporan Terselesaikan</div>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex rounded-full bg-warning/10 p-4">
                <Clock className="h-8 w-8 text-warning" />
              </div>
              <div className="text-4xl font-bold text-foreground">24 Jam</div>
              <div className="text-muted-foreground">Rata-rata Respon Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex rounded-full bg-success/10 p-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="text-4xl font-bold text-foreground">95%</div>
              <div className="text-muted-foreground">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-info/5">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Mulai Laporkan Fasilitas Kampus
              </h2>
              <p className="mb-6 max-w-2xl text-muted-foreground">
                Kontribusi Anda sangat berarti untuk menciptakan lingkungan kampus yang lebih baik dan nyaman untuk semua
              </p>
              <Button asChild size="lg">
                <Link to="/reports">
                  <FileText className="mr-2 h-5 w-5" />
                  Buat Laporan Sekarang
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;

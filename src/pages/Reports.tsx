import { useState } from "react";
import Navbar from "@/components/Navbar";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockReports } from "@/lib/mockData";
import { Report, ReportStatus, FacilityCategory } from "@/types/report";
import { Upload, Filter } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const categoryLabels: Record<FacilityCategory, string> = {
  classroom: "Ruang Kelas",
  laboratory: "Laboratorium",
  library: "Perpustakaan",
  toilet: "Toilet",
  sports_facility: "Fasilitas Olahraga",
  canteen: "Kantin",
  parking: "Parkir",
  other: "Lainnya",
};

const statusLabels: Record<ReportStatus, string> = {
  pending: "Menunggu",
  in_progress: "Diproses",
  completed: "Selesai",
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "all">("all");
  const [filterCategory, setFilterCategory] = useState<FacilityCategory | "all">("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as FacilityCategory,
    location: "",
    reporterName: "",
    reporterEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport: Report = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setReports([newReport, ...reports]);
    setFormData({
      title: "",
      description: "",
      category: "" as FacilityCategory,
      location: "",
      reporterName: "",
      reporterEmail: "",
    });

    toast.success("Laporan berhasil dikirim!", {
      description: "Tim kami akan segera menindaklanjuti laporan Anda.",
    });
  };

  const filteredReports = reports.filter((report) => {
    const statusMatch = filterStatus === "all" || report.status === filterStatus;
    const categoryMatch = filterCategory === "all" || report.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const statusCounts = {
    all: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    in_progress: reports.filter((r) => r.status === "in_progress").length,
    completed: reports.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="create">Buat Laporan</TabsTrigger>
            <TabsTrigger value="list">Daftar Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buat Laporan Baru</CardTitle>
                <CardDescription>
                  Laporkan kondisi fasilitas kampus yang memerlukan perbaikan atau perawatan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reporterName">Nama Lengkap</Label>
                      <Input
                        id="reporterName"
                        placeholder="Masukkan nama lengkap"
                        value={formData.reporterName}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporterEmail">Email</Label>
                      <Input
                        id="reporterEmail"
                        type="email"
                        placeholder="nama@student.ac.id"
                        value={formData.reporterEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterEmail: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Laporan</Label>
                    <Input
                      id="title"
                      placeholder="Contoh: AC Ruang Kelas Rusak"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Fasilitas</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: FacilityCategory) =>
                        setFormData({ ...formData, category: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      placeholder="Contoh: Gedung A, Lantai 2, Ruang 201"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Masalah</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan kondisi fasilitas secara detail..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Foto (Opsional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="cursor-pointer"
                      />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload foto untuk membantu kami memahami kondisi fasilitas
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Kirim Laporan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Laporan</CardTitle>
                <CardDescription>
                  Lihat semua laporan dan pantau status penanganannya
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                  >
                    Semua
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.all}
                    </Badge>
                  </Button>
                  <Button
                    variant={filterStatus === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("pending")}
                  >
                    Menunggu
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.pending}
                    </Badge>
                  </Button>
                  <Button
                    variant={filterStatus === "in_progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("in_progress")}
                  >
                    Diproses
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.in_progress}
                    </Badge>
                  </Button>
                  <Button
                    variant={filterStatus === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("completed")}
                  >
                    Selesai
                    <Badge variant="secondary" className="ml-2">
                      {statusCounts.completed}
                    </Badge>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={filterCategory}
                    onValueChange={(value: FacilityCategory | "all") =>
                      setFilterCategory(value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onClick={() => setSelectedReport(report)}
                    />
                  ))}
                </div>

                {filteredReports.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    Tidak ada laporan ditemukan
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              Dilaporkan oleh {selectedReport?.reporterName} pada{" "}
              {selectedReport && format(selectedReport.createdAt, "dd MMMM yyyy", { locale: id })}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {selectedReport.photoUrl && (
                <img
                  src={selectedReport.photoUrl}
                  alt={selectedReport.title}
                  className="w-full rounded-lg object-cover"
                />
              )}
              <div className="space-y-4">
                <div>
                  <h4 className="mb-1 font-semibold text-sm text-muted-foreground">Status</h4>
                  <Badge variant={selectedReport.status === "completed" ? "success" : selectedReport.status === "in_progress" ? "info" : "warning"}>
                    {statusLabels[selectedReport.status]}
                  </Badge>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-sm text-muted-foreground">Kategori</h4>
                  <p>{categoryLabels[selectedReport.category]}</p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-sm text-muted-foreground">Lokasi</h4>
                  <p>{selectedReport.location}</p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-sm text-muted-foreground">Deskripsi</h4>
                  <p className="text-muted-foreground">{selectedReport.description}</p>
                </div>
                {selectedReport.adminNote && (
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-1 font-semibold text-sm">Catatan Admin</h4>
                    <p className="text-sm text-muted-foreground">{selectedReport.adminNote}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;

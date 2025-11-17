import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockReports } from "@/lib/mockData";
import { Report, ReportStatus } from "@/types/report";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";

const statusLabels: Record<ReportStatus, string> = {
  pending: "Menunggu",
  in_progress: "Diproses",
  completed: "Selesai",
};

const Admin = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>("pending");
  const [adminNote, setAdminNote] = useState("");

  const handleUpdateStatus = () => {
    if (!selectedReport) return;

    const updatedReports = reports.map((report) =>
      report.id === selectedReport.id
        ? {
            ...report,
            status: newStatus,
            adminNote: adminNote || report.adminNote,
            updatedAt: new Date(),
          }
        : report
    );

    setReports(updatedReports);
    setSelectedReport(null);
    setAdminNote("");
    
    toast.success("Status laporan berhasil diupdate!", {
      description: `Laporan "${selectedReport.title}" telah diubah statusnya.`,
    });
  };

  const openUpdateDialog = (report: Report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setAdminNote(report.adminNote || "");
  };

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    in_progress: reports.filter((r) => r.status === "in_progress").length,
    completed: reports.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Kelola dan update status laporan fasilitas kampus
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Laporan</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Diproses</p>
                  <p className="text-2xl font-bold">{stats.in_progress}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selesai</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Laporan</CardTitle>
            <CardDescription>Klik pada baris untuk mengupdate status laporan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.reporterName}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{report.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "completed"
                              ? "success"
                              : report.status === "in_progress"
                              ? "info"
                              : "warning"
                          }
                        >
                          {statusLabels[report.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(report.createdAt, "dd MMM yyyy", { locale: id })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openUpdateDialog(report)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status Laporan</DialogTitle>
            <DialogDescription>{selectedReport?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={(value: ReportStatus) => setNewStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="in_progress">Diproses</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Catatan Admin</Label>
              <Textarea
                id="note"
                placeholder="Tambahkan catatan untuk pelapor..."
                rows={4}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Batal
            </Button>
            <Button onClick={handleUpdateStatus}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;

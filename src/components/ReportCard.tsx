import { Report } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

const statusConfig = {
  pending: {
    label: "Menunggu",
    variant: "warning" as const,
  },
  in_progress: {
    label: "Diproses",
    variant: "info" as const,
  },
  completed: {
    label: "Selesai",
    variant: "success" as const,
  },
};

const categoryLabels: Record<string, string> = {
  classroom: "Ruang Kelas",
  laboratory: "Laboratorium",
  library: "Perpustakaan",
  toilet: "Toilet",
  sports_facility: "Fasilitas Olahraga",
  canteen: "Kantin",
  parking: "Parkir",
  other: "Lainnya",
};

const ReportCard = ({ report, onClick }: ReportCardProps) => {
  const statusInfo = statusConfig[report.status];

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group" 
      onClick={onClick}
    >
      {report.photoUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={report.photoUrl}
            alt={report.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">
            {report.title}
          </h3>
          <Badge 
            variant={statusInfo.variant}
            className="shrink-0"
          >
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {report.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{report.location}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Kategori: {categoryLabels[report.category]}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/30 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span>{report.reporterName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(report.createdAt, "dd MMM yyyy", { locale: id })}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;

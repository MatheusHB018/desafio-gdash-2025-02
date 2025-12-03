import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { explorerItems, ExplorerItem } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Compass, Zap, Shield, Gauge } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const typeColors: Record<string, string> = {
  Fire: "bg-destructive/20 text-destructive border-destructive/30",
  Water: "bg-primary/20 text-primary border-primary/30",
  Electric: "bg-warning/20 text-warning border-warning/30",
  Grass: "bg-success/20 text-success border-success/30",
  Ice: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  Dragon: "bg-chart-4/20 text-chart-4 border-chart-4/30",
};

export default function Explorer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ExplorerItem | null>(null);

  const totalPages = Math.ceil(explorerItems.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return explorerItems.slice(start, end);
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Explorer</h1>
            <p className="mt-1 text-muted-foreground">
              Discover and explore creatures from the API
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <Card
            key={item.id}
            className="glass-card animate-scale-in cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-xl bg-secondary">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {item.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`mt-2 ${typeColors[item.type] || ""}`}
                >
                  {item.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-secondary">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.name}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedItem.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={typeColors[selectedItem.type] || ""}
                      >
                        {selectedItem.type}
                      </Badge>
                      <span>#{selectedItem.id.toString().padStart(3, "0")}</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <p className="text-sm text-muted-foreground">
                  {selectedItem.description}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-warning" />
                          <span>Power</span>
                        </div>
                        <span className="font-mono">{selectedItem.stats.power}</span>
                      </div>
                      <Progress value={selectedItem.stats.power} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-primary" />
                          <span>Speed</span>
                        </div>
                        <span className="font-mono">{selectedItem.stats.speed}</span>
                      </div>
                      <Progress value={selectedItem.stats.speed} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-success" />
                          <span>Defense</span>
                        </div>
                        <span className="font-mono">{selectedItem.stats.defense}</span>
                      </div>
                      <Progress value={selectedItem.stats.defense} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Search, Bell, Command, Menu } from "lucide-react";
import { EiosOrb } from "@/components/EiosOrb";
import { useState } from "react";

export function Header({
  onMenuClick,
  onOpenPalette,
}: {
  onMenuClick: () => void;
  onOpenPalette?: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1 rounded-md hover:bg-muted/70 text-muted-foreground transition-colors"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            Sản xuất
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onOpenPalette?.()}
          className="relative group w-64 hidden md:flex items-center text-left bg-muted/40 hover:bg-muted/60 border border-border/60 hover:border-primary/40 rounded-md pl-8 pr-12 py-1.5 text-[13px] transition-all"
          data-testid="header-open-palette"
        >
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-muted-foreground/80 truncate">
            Tìm agent, phiên thực thi...
          </span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-muted-foreground/60">
            <Command className="h-3 w-3" />
            <span className="text-[10px] font-semibold">K</span>
          </div>
        </button>

        <button
          onClick={() => onOpenPalette?.()}
          className="md:hidden p-2 rounded-md hover:bg-muted/70 text-muted-foreground transition-colors"
          aria-label="Tìm kiếm"
        >
          <Search className="h-4 w-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-md hover:bg-muted/70 transition-colors group"
            aria-label="Thông báo"
          >
            <Bell className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background shadow-[0_0_6px_rgba(8,200,232,0.7)]" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-xl shadow-black/30 z-50 overflow-x-auto">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold">Thông báo</span>
                <span className="text-[10px] text-primary font-medium cursor-pointer hover:underline">Đánh dấu đã đọc</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {[
                  { icon: "🔴", title: "Agent Security Scanner", msg: "Phát hiện lỗ hổng nghiêm trọng trong deps", time: "2 phút trước" },
                  { icon: "🟡", title: "Eios", msg: "Đang chờ phê duyệt: DROP TABLE sessions", time: "5 phút trước" },
                  { icon: "🟢", title: "K8s Manifest Linter", msg: "8.910 lượt chạy thành công hôm nay", time: "10 phút trước" },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-muted/40 cursor-pointer border-b border-border/50 last:border-0 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <span className="text-base shrink-0 mt-0.5">{n.icon}</span>
                      <div className="min-w,0 flex-1">
                        <p className="text-xs font-semibold truncate">{n.title}</p>
                        <p className="text-[11px] text-muted-fore`
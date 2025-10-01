export function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-2 pt-4 text-center text-xs text-slate-500 sm:text-sm">
      <p>Built because the developer needs it.</p>
      <p>© {new Date().getFullYear()} VqiiRixx. All rights reserved.</p>
    </footer>
  );
}

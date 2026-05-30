"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { NoteListItem } from "@/components/notes/note-list-item";
import { splitPinnedNotes } from "@/lib/utils/note";
import { useNotes } from "@/lib/utils/api/hooks/useNotes";
import { GetNoteResponse } from "@/lib/types/note";

type NotesSidebarProps = {
  className?: string;
};

export function NotesSidebar({ className = "" }: NotesSidebarProps) {
  const pathname = usePathname();
  const { notes, isLoadingNotes } = useNotes();
  const { pinned, unpinned } = splitPinnedNotes((notes as GetNoteResponse) || { owned: [], shared: [] });

  return (
    <aside
      className={[
        "h-screen w-full shrink-0 flex-col border-r border-border bg-paper-elevated md:w-72 lg:w-80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="border-b border-border px-4 py-4">
        <Logo href="/notes" />
      </div>

      <div className="p-3">
        <Link
          href="/notes/new"
          className={[
            "flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            pathname === "/notes/new"
              ? "bg-accent-hover text-white"
              : "bg-accent text-white hover:bg-accent-hover",
          ].join(" ")}
        >
          + New note
        </Link>
      </div>

      {
        isLoadingNotes ? (
          <p className="px-3 py-6 text-center text-sm text-ink-muted flex-1 overflow-y-auto">
            Loading notes...
          </p>
        ) : (<nav className="flex-1 overflow-y-auto px-2 pb-4" aria-label="Notes">
          {notes?.owned.length === 0 && notes?.shared.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              No notes yet. Create your first one.
            </p>
          ) : (
            <div className="space-y-4">
              {pinned.length > 0 && (
                <section>
                  <h2 className="px-3 pb-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    Pinned
                  </h2>
                  <ul className="space-y-0.5">
                    {pinned.map((note) => (
                      <li key={note.id}>
                        <NoteListItem
                          note={note}
                          isActive={
                            pathname === `/notes/${note.id}` ||
                            pathname.startsWith(`/notes/${note.id}/`)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {unpinned.length > 0 && (
                <section>
                  {pinned.length > 0 && (
                    <h2 className="px-3 pb-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                      All notes
                    </h2>
                  )}
                  <ul className="space-y-0.5">
                    {unpinned.map((note) => (
                      <li key={note.id}>
                        <NoteListItem
                          note={note}
                          isActive={
                            pathname === `/notes/${note.id}` ||
                            pathname.startsWith(`/notes/${note.id}/`)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </nav>)
      }



      <div className="border-t border-border p-3">
        <Link
          href="/signin"
          className="block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-border/50 hover:text-ink"
        >
          Sign out
        </Link>
      </div>
    </aside>
  );
}

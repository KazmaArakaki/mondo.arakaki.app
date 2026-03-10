"use client";

export function Header(props: {
  bookmark: {
    url: string;
    post: {
      title: string;
    };
  },
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex items-center px-8 min-h-16 bg-white/75 rounded-[32px]">
        <div className="flex flex-col min-w-0">
          <div className="text-sm truncate">
            {props.bookmark.post.title}
          </div>

          <div className="text-xs text-app-medium-gray truncate">
            {props.bookmark.url}
          </div>
        </div>
      </div>
    </div>
  );
}

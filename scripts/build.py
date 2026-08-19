#!/usr/bin/env python3
"""Build a self-contained atlas page: engine + your data + your theme.
usage: build.py <data.js> <out.html> [theme.css]"""
import sys,re,pathlib
here=pathlib.Path(__file__).resolve().parent.parent
data=pathlib.Path(sys.argv[1]).read_text()
out=pathlib.Path(sys.argv[2])
theme=pathlib.Path(sys.argv[3]).read_text() if len(sys.argv)>3 else ""
page=(here/"assets/engine.html").read_text()
m=re.search(r"title:\s*'([^']+)'",data) or re.search(r'title:\s*"([^"]+)"',data)
page=page.replace("__TITLE__", m.group(1) if m else "Codebase Atlas")
page=page.replace("/*__THEME__*/", theme)
page=page.replace("/*__DATA__*/", data)
# charset for local preview; the artifact host supplies its own head
page='<meta charset="utf-8">\n'+page
out.write_text(page)
print(f"built {out} ({len(page)//1024} KB)")

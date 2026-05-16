command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="https://stemrapporter.github.io/codex_nothing/?widget=StatusPillsCard"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: 300px
  height: 160px
  background: transparent
"""

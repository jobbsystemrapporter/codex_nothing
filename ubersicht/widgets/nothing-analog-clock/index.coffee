command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="https://stemrapporter.github.io/codex_nothing/?widget=AnalogClockCard"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: 280px
  height: 280px
  background: transparent
"""

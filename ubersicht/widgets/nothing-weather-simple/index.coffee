command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="https://stemrapporter.github.io/codex_nothing/?widget=WeatherCard"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: 260px
  height: 200px
  background: transparent
"""

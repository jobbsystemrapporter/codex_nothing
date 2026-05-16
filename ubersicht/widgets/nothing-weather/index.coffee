command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="https://jobbsystemrapporter.github.io/codex_nothing/?widget=LiveWeatherAccentCard"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: 340px
  height: 260px
  background: transparent
"""

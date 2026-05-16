command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="https://jobbsystemrapporter.github.io/codex_nothing/?widget=DayAgendaCard"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: 300px
  height: 220px
  background: transparent
"""

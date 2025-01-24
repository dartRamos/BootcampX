SELECT teachers.name, COUNT(assistance_requested.id) AS total_assistances
FROM teachers
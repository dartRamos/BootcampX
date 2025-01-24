SELECT day, COUNT(*) as total_assignments
FROM assignments
GROUP BY dayORDER BY day
ORDER BY day;
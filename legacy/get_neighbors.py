def get_neighbors(country):
    query_center = """
                   SELECT AVG(latitude_deg), AVG(longitude_deg)
                   FROM airport AS a
                            JOIN country AS c ON a.iso_country = c.iso_country
                   WHERE c.name = %s \
                   """
    cursor.execute(query_center, (country,))
    center = cursor.fetchone()
    if not center:
        print("Country not found!")
        return

    lat1, lon1 = center

    query_neighbors = """
                      SELECT c2.name, \
                             c2.iso_country,
                             ROUND(6371 * ACOS(
                                     COS(RADIANS(%s)) * COS(RADIANS(AVG(a2.latitude_deg))) *
                                     COS(RADIANS(AVG(a2.longitude_deg)) - RADIANS(%s)) +
                                     SIN(RADIANS(%s)) * SIN(RADIANS(AVG(a2.latitude_deg)))
                                          )) AS km
                      FROM country AS c2
                               JOIN airport AS a2 ON a2.iso_country = c2.iso_country
                      WHERE c2.name != %s
                      GROUP BY c2.name, c2.iso_country
                      HAVING km < 800
                      ORDER BY km \
                      """

    cursor.execute(query_neighbors, (lat1, lon1, lat1, country))
    neighbors = cursor.fetchall()

    print("Neighbors of " + country + ":")
    for neigh in neighbors:
        print("  " + neigh[0] + " (" + neigh[1] + ") - " + str(neigh[2]) + " km")

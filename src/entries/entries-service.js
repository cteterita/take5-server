const entriesService = {
  getByDate(db, date, userId) {
    return db
      .where('userId', '==', userId)
      .where('date', '==', date)
      .get();
  },
  insertEntry(db, entryData) {
    return db
      .add(entryData);
  },
  deleteDaysEntries(db, date, userId) {
    // Firebase doesn't have a simple batch update function, so we have to query for the
    // matching entries and then iterate through and delete each by its id
    return db
      .where('userId', '==', userId)
      .where('date', '==', date)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => db.doc(doc.id).delete());
      });
  },
};

module.exports = entriesService;

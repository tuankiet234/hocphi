<template>
  <div class="text-h5 text-center q-py-md">DANH SÁCH LỚP HỌC</div>
  <q-table :rows="classes" grid :pagination="{ rowsPerPage: 0 }" hide-pagination>
    <template #item="{ row }">
      <q-card class="full-width" square>
        <q-card-section horizontal>
          <q-card-section class="row items-center">
            <q-icon name="school" color="primary" size="lg"></q-icon>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">{{ row.name }}</div>
            <div class="text-caption">Số học sinh: {{ row.totalStudent }}</div>
          </q-card-section>
          <q-card-actions align="right" style="flex-grow: 1">
            <q-btn icon="more_horiz" round flat>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Danh sách học sinh</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Sửa</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section class="text-negative">Xóa</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </template>
  </q-table>
  <!-- <q-list bordered separator>
    <q-item clickable v-ripple>
      <q-item-section>Single line item</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label>Item with caption</q-item-label>
        <q-item-label caption>Caption</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section>
        <q-item-label overline>OVERLINE</q-item-label>
        <q-item-label>Item with overline</q-item-label>
      </q-item-section>
    </q-item>
  </q-list> -->
</template>
<script setup lang="ts">
import { executeList } from 'src/boot/axios';
import { loading } from 'src/boot/loading';
import { toast } from 'src/boot/toast';
import { ref } from 'vue';

const classes = ref<{ name: string; id: string; totalStudent: number }[]>([]);
const getClasses = async () => {
  loading.show('classes');
  try {
    const res = await executeList(`
      SELECT 
        c.id, c.name, COUNT(s.id) AS totalStudent
      FROM my_class c
      LEFT JOIN my_student s ON s.classId = c.id
      GROUP BY c.id, c.name
      ORDER BY c.name ASC
    `);

    classes.value = res.data;
  } catch {
    toast.error('Lỗi khi lấy danh sách lớp học');
  } finally {
    loading.hide('classes');
  }
};

await getClasses();
</script>

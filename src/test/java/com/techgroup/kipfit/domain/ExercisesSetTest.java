package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class ExercisesSetTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExercisesSet.class);
        ExercisesSet exercisesSet1 = new ExercisesSet();
        exercisesSet1.setId(1L);
        ExercisesSet exercisesSet2 = new ExercisesSet();
        exercisesSet2.setId(exercisesSet1.getId());
        assertThat(exercisesSet1).isEqualTo(exercisesSet2);
        exercisesSet2.setId(2L);
        assertThat(exercisesSet1).isNotEqualTo(exercisesSet2);
        exercisesSet1.setId(null);
        assertThat(exercisesSet1).isNotEqualTo(exercisesSet2);
    }
}

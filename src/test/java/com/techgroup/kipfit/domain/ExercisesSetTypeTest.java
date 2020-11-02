package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class ExercisesSetTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExercisesSetType.class);
        ExercisesSetType exercisesSetType1 = new ExercisesSetType();
        exercisesSetType1.setId(1L);
        ExercisesSetType exercisesSetType2 = new ExercisesSetType();
        exercisesSetType2.setId(exercisesSetType1.getId());
        assertThat(exercisesSetType1).isEqualTo(exercisesSetType2);
        exercisesSetType2.setId(2L);
        assertThat(exercisesSetType1).isNotEqualTo(exercisesSetType2);
        exercisesSetType1.setId(null);
        assertThat(exercisesSetType1).isNotEqualTo(exercisesSetType2);
    }
}
